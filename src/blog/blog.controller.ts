import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async getPosts() {
    const posts = await this.blogService.getPosts();
    return {
      statusCode: HttpStatus.OK,
      message: 'Posts retrieved successfully',
      posts,
    };
  }

  @Post()
  async addPost(@Res() res: any, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'Post has been created successfully',
      post: newPost,
    });
  }

  @Put('/edit')
  async editPost(
    @Res() res: any,
    @Query('postID', new ValidateObjectId()) postID,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.blogService.editPost(postID, createPostDTO);
    if (!editedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost,
    });
  }

  @Delete('/delete')
  async deletePost(
    @Res() res: any,
    @Query('postID', new ValidateObjectId()) postID,
  ) {
    const deletedPost = await this.blogService.deletePost(postID);
    if (!deletedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted successfully',
      post: deletedPost,
    });
  }

  @Get('/:postID')
  async getPost(
    @Param('postID', new ValidateObjectId()) postID: string,
  ) {
    const post = await this.blogService.getPost(postID);
    if (!post) {
      throw new NotFoundException('Post does not exist!');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Post retrieved successfully',
      post,
    }
  }
}
