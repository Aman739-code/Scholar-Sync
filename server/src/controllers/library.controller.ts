import { Request, Response, NextFunction } from 'express';
import LibraryResource from '../models/LibraryResource';
import ResourceChapter from '../models/ResourceChapter';
import ReadingProgress from '../models/ReadingProgress';
import SavedCollection from '../models/SavedCollection';

export const getResources = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type, category, search, page = 1, limit = 20 } = req.query;
    const filter: any = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (search) filter.$text = { $search: search as string };

    const skip = (Number(page) - 1) * Number(limit);
    const resources = await LibraryResource.find(filter).skip(skip).limit(Number(limit)).sort({ addedDate: -1 });
    const total = await LibraryResource.countDocuments(filter);

    // If student, attach reading progress
    if (req.user!.role === 'student') {
      const progresses = await ReadingProgress.find({ userId: req.user!.userId, resourceId: { $in: resources.map(r => r._id) } });
      const progressMap = new Map(progresses.map(p => [p.resourceId.toString(), p]));
      const resourcesWithProgress = resources.map(r => ({
        ...r.toObject(), progress: progressMap.get((r._id as any).toString()) || null,
      }));
      res.json({ resources: resourcesWithProgress, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
      return;
    }

    res.json({ resources, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
};

export const getResource = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { idOrSlug } = req.params;
    let resource = await LibraryResource.findOne({ slug: idOrSlug });
    if (!resource) resource = await LibraryResource.findById(idOrSlug).catch(() => null);
    if (!resource) { res.status(404).json({ error: 'Resource not found.' }); return; }

    const chapters = await ResourceChapter.find({ resourceId: resource._id }).sort({ orderIndex: 1 });

    let progress = null;
    if (req.user!.role === 'student') {
      progress = await ReadingProgress.findOne({ userId: req.user!.userId, resourceId: resource._id });
    }

    res.json({ resource, chapters, progress });
  } catch (err) { next(err); }
};

export const createResource = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const resource = await LibraryResource.create({ ...req.body, slug });

    // Create chapters if provided
    if (req.body.chapters && req.body.chapters.length > 0) {
      const chapters = req.body.chapters.map((ch: any, i: number) => ({ ...ch, resourceId: resource._id, orderIndex: i + 1 }));
      await ResourceChapter.insertMany(chapters);
    }

    res.status(201).json({ resource });
  } catch (err) { next(err); }
};

export const updateProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { resourceId, currentPage, currentTime } = req.body;
    const progress = await ReadingProgress.findOneAndUpdate(
      { userId: req.user!.userId, resourceId },
      { currentPage, currentTime, lastAccessed: new Date() },
      { new: true, upsert: true }
    );
    res.json({ progress });
  } catch (err) { next(err); }
};

export const getSaved = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let collection = await SavedCollection.findOne({ userId: req.user!.userId }).populate('resourceIds');
    if (!collection) {
      collection = await SavedCollection.create({ userId: req.user!.userId, resourceIds: [] });
    }
    res.json({ collection });
  } catch (err) { next(err); }
};

export const saveResource = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { resourceId } = req.body;
    let collection = await SavedCollection.findOne({ userId: req.user!.userId });
    if (!collection) {
      collection = await SavedCollection.create({ userId: req.user!.userId, resourceIds: [resourceId] });
    } else {
      if (!collection.resourceIds.includes(resourceId)) {
        collection.resourceIds.push(resourceId);
        await collection.save();
      }
    }
    res.json({ collection });
  } catch (err) { next(err); }
};

export const getRecentResources = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const progresses = await ReadingProgress.find({ userId: req.user!.userId })
      .sort({ lastAccessed: -1 }).limit(5).populate('resourceId');
    res.json({ resources: progresses.map(p => ({ ...(p.resourceId as any).toObject(), progress: p })) });
  } catch (err) { next(err); }
};
