import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const newPost = new this.postModel(createPostDTO);
    return await newPost.save();
  }

  async getPost(postID: any): Promise<Post | null> {
    const post = await this.postModel.findById(postID).exec();
    return post;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async editPost(
    postID: any,
    createPostDTO: CreatePostDTO,
  ): Promise<Post | null> {
    const editedPost = await this.postModel.findByIdAndUpdate(
      postID,
      createPostDTO,
      { new: true },
    );
    return editedPost;
  }

  async deletePost(postID: any): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndDelete(postID);
    return deletedPost;
  }
}
