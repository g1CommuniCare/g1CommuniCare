package com.example.demo.Controller;

import com.example.demo.DTO.BulletinPostDTO;
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

    @PostMapping("/createPost")
    public ResponseEntity<BulletinPostDTO> createBulletinPost(@RequestParam int adminId,
            @RequestBody BulletinPostEntity bulletinPost) {
        // Pass the adminId to your service method
        BulletinPostEntity createdPost = bulletinPostServices.createBulletinPost(adminId, bulletinPost);

        // Convert the entity to DTO
        BulletinPostDTO createdPostDTO = createdPost.toDTO();

        return new ResponseEntity<>(createdPostDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/deletePost/{postId}")
    public String deleteBulletinPost(@PathVariable int postId) {
        return bulletinPostServices.deleteBulletinPost(postId);
    }

    @PostMapping("/upvote/{postId}/{userId}")
    public ResponseEntity<?> upvotePost(@PathVariable int postId, @PathVariable int userId) {
        try {
            bulletinPostServices.handleVote(postId, userId, true); // true for upvote
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/downvote/{postId}/{userId}")
    public ResponseEntity<?> downvotePost(@PathVariable int postId, @PathVariable int userId) {
        try {
            bulletinPostServices.handleVote(postId, userId, false); // false for downvote
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Soft delete
    @PutMapping("/{postId}/delete")
    public ResponseEntity<String> updateBulletinPostIsDeleted(@PathVariable int postId) {
        String result = bulletinPostServices.updateBulletinPostIsDeleted(postId);
        HttpStatus status = result.contains("does not exist") ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return new ResponseEntity<>(result, status);
    }

    @PutMapping("/update/{postId}")
    public ResponseEntity<String> updateBulletinPost(
            @PathVariable int postId,
            @RequestParam String title,
            @RequestParam String content) {

        String result = bulletinPostServices.updateBulletinPost(postId, title, content);

        if (result.startsWith("Bulletin Post does not exist")) {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }
}
