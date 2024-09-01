import { Request, Response } from "express";
import { CommentDocument, CommentInput } from "../models/comment.model";
import CommentService from "../services/comment.service";

class CommentController {

    public async create(req: Request, res: Response) {

        try {

            const { userId, content, parentId } = req.body;
            const comment: CommentDocument = await CommentService.create({ userId, content, parentId });
            return res.status(201).json(comment);

        } catch (error) {

            return res.status(500).json(error);

        }

    };

    public async get(req: Request, res: Response) {

        try {

            const comment: CommentDocument | null = await CommentService.findById(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: `Comment with id: ${req.params.id} not found` });
            }
            res.json(comment);

        } catch (error) {

            res.status(500).json(error);

        }

    };

    public async getAll(req: Request, res: Response) {

        try {

            const comments: CommentDocument[] = await CommentService.findAll();
            res.json(comments);

        } catch (error) {

            res.status(500).json(error);

        }

    };

    public async getByParentId(req: Request, res: Response) {

        try {

            const comments: CommentDocument[] = await CommentService.findByParentId(req.params.parentId);
            res.json(comments);

        } catch (error) {

            res.status(500).json(error);

        }

    };

    public async update(req: Request, res: Response) {

        try {

            const comment: CommentDocument | null = await CommentService.update(req.params.id, req.body.content as CommentInput);
            if (!comment) {
                return res.status(404).json({ message: `Comment with id: ${req.params.id} not found` });
            }
            res.json(comment);

        } catch (error) {

            res.status(500).json(error);

        }

    };

    public async delete(req: Request, res: Response) {

        try {

            const comment: CommentDocument | null = await CommentService.delete(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: `Comment with id: ${req.params.id} not found` });
            }
            res.json(comment);

        } catch (error) {

            res.status(500).json(error);

        }

    };

};

export default new CommentController();