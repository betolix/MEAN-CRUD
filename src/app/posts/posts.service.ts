import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpEvent, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { TouchSequence } from 'selenium-webdriver';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router){};


  getPosts() {
    // return this.posts;
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id); // ESTE ES UN OVSERVABLE
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      console.log(responseData.message);
      // OBTENIDO EL ID DEL POST CREADO EN BD SE INSERTA AL ID DEL OBJETO POST LOCAL
      const id = responseData.postId;
      post.id = id;
      // ESTAS DOS LINEAS SOLO SE REALIZAN SI LA COMUNICACION CON EL SERVIDOR ES EXITOSA,
      // SI ESTAN DEBAJO DEL BRACKET ACTUALIZAN LOCALMENTE ANTES DE RECIBIR RESPUESTA DEL SERVIDOR
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {id: id, title: title, content: content };
    this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex( p => p.id === post.id );
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId );
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });

  }
}
