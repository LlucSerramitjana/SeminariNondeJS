import {Request, response, Response, Router} from 'express';

import Post from '../models/Post';

class PostRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getPosts(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allPosts = await Post.find();
        if (allPosts.length == 0){
            res.status(404).send("There are no posts yet!")
        }
        else{
            res.status(200).send(allPosts);
        }
    }

    public async getPostByName(req: Request, res: Response) : Promise<void> {
        const postFound = await Post.findOne({name: req.params.namePost});
        if(postFound == null){
            res.status(404).send("The user doesn't exist!");
        }
        else{
            res.status(200).send(postFound);
        }
    }

    public async addPost(req: Request, res: Response) : Promise<void> {
        console.log(req.body);
        const {id, name, age} = req.body;
        const newPost = new Post({id, name, age});
        await newPost.save();
        res.status(200).send('Post added!');
    }

    public async updatePost(req: Request, res: Response) : Promise<void> {
        const postToUpdate = await Post.findOneAndUpdate ({name: req.params.namePost}, req.body);
        if(postToUpdate == null){
            res.status(404).send("The post doesn't exist!");
        }
        else{
            res.status(200).send('Updated!');
        }
    }

    public async deletePost(req: Request, res: Response) : Promise<void> {
        const postToDelete = await Post.findOneAndDelete ({name:req.params.namePost}, req.body);
        if (postToDelete == null){
            res.status(404).send("The post doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 
    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:namePost', this.getPostByName);
        this.router.post('/', this.addPost);
        this.router.put('/:namePost', this.updatePost);
        this.router.delete('/:namePost', this.deletePost);
    }
}
const postRoutes = new PostRoutes();

export default postRoutes.router;