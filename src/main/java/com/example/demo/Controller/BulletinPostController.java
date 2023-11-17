package com.example.demo.Controller;

import com.example.demo.Entity.BulletinPostEntity;
import com.example.demo.Services.AdminServices;
import com.example.demo.Services.BulletinPostServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bulletin")
public class BulletinPostController {

    @Autowired
    BulletinPostServices bulletinPostServices;
    AdminServices adminServices;
    
    public BulletinPostController(BulletinPostServices bulletinPostServices) {
        this.bulletinPostServices = bulletinPostServices;
    }

    @GetMapping("/getAllBulletinPosts")
    public List<BulletinPostEntity> getAllBulletinPosts() {
        return bulletinPostServices.getAllBulletinPosts();
    }

    @GetMapping("/{postId}")
    public ResponseEntity<BulletinPostEntity> getBulletinPostById(@PathVariable int postId) {
        Optional<BulletinPostEntity> bulletinPost = bulletinPostServices.getBulletinPostById(postId);
        return bulletinPost.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // @PostMapping("/createPost/")
    // public ResponseEntity<BulletinPostEntity> createBulletinPost(@RequestParam int adminId, @RequestBody BulletinPostEntity bulletinPost) {
    //     BulletinPostEntity createdPost = bulletinPostServices.createBulletinPost(adminId, bulletinPost);
    //     return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    // }    

    // @PostMapping("/createPost/{adminId}")
    //         public ResponseEntity<BulletinPostEntity> createBulletinPost(
    //         @PathVariable int adminId,
    //         @RequestBody BulletinPostEntity bulletinPost) {
    //     // Pass the adminId to your service method
    //     BulletinPostEntity createdPost = bulletinPostServices.createBulletinPost(adminId, bulletinPost);
    //     return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    // }

    @PostMapping("/createPost/{adminId}")
    public ResponseEntity<BulletinPostEntity> createBulletinPost(@PathVariable int adminId, @RequestBody BulletinPostEntity bulletinPost) {
        // Pass the adminId to your service method
        BulletinPostEntity createdPost = bulletinPostServices.createBulletinPost(adminId, bulletinPost);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<BulletinPostEntity> updateBulletinPost(
            @PathVariable int postId,
            @RequestBody BulletinPostEntity updatedPost
    ) {
        Optional<BulletinPostEntity> existingPost = bulletinPostServices.getBulletinPostById(postId);
        if (existingPost.isPresent()) {
            updatedPost.setPostId(postId);
            BulletinPostEntity savedPost = bulletinPostServices.updateBulletinPost(updatedPost);
            return ResponseEntity.ok(savedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deletePost/{postId}")
    public String deleteBulletinPost(@PathVariable int postId) {
        return bulletinPostServices.deleteBulletinPost(postId);
    }

    @PostMapping("/upvote/{postId}")
    public String upvoteBulletinPost(@PathVariable int postId) {
        return bulletinPostServices.upvoteBulletinPost(postId);
    }

    @PostMapping("/downvote/{postId}")
    public String downvoteBulletinPost(@PathVariable int postId) {
        return bulletinPostServices.downvoteBulletinPost(postId);
    }
}
