import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   {title: 'First Post', content: 'This is the first posts\'s content'},
  //   {title: 'Second Post', content: 'This is the Second posts\'s content'},
  //   {title: 'Third Post', content: 'This is the Third posts\'s content'},
  //   {title: 'Fourth Post', content: 'This is the Fourth posts\'s content'},
  // ];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;


  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe( (posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    } );
  }

 onDelete(postId: string) {
   this.postsService.deletePost(postId);
 }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
