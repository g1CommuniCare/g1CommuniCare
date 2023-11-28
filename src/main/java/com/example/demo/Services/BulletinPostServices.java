package com.example.demo.Services;

import com.example.demo.Entity.AdminEntity;
import com.example.demo.Entity.BulletinPostEntity;
import com.example.demo.Entity.BulletinPostEntity.VoteType;
import com.example.demo.Repository.AdminRepository;
import com.example.demo.Repository.BulletinPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BulletinPostServices {

    @Autowired
    BulletinPostRepository bulletinPostRepository;

    @Autowired
    AdminRepository adminRepository;

    public BulletinPostServices(BulletinPostRepository bulletinPostRepository) {
        this.bulletinPostRepository = bulletinPostRepository;
    }

    public List<BulletinPostEntity> getAllBulletinPosts() {
        return bulletinPostRepository.findAll();
    }

    public Optional<BulletinPostEntity> getBulletinPostById(int postId) {
        return bulletinPostRepository.findById(postId);
    }

    public BulletinPostEntity createBulletinPost(int adminId, BulletinPostEntity bulletinPost) {
        // Retrieve the AdminEntity from the database using the adminId
        Optional<AdminEntity> adminOptional = adminRepository.findById(adminId);

        if (adminOptional.isPresent()) {
            AdminEntity admin = adminOptional.get();
            // Set the retrieved admin in the bulletinPost entity
            bulletinPost.setAdmin(admin);

            // Additional business logic if needed

            // Save the bulletinPost entity
            return bulletinPostRepository.save(bulletinPost);
        } else {
            // Handle the case where the admin with the provided id is not found
            throw new NoSuchElementException("Admin with that id not found.");

        }
    }

    public BulletinPostEntity updateBulletinPost(BulletinPostEntity bulletinPost) {
        // Additional business logic if needed
        return bulletinPostRepository.save(bulletinPost);
    }

    public String deleteBulletinPost(int postId) {
        if (bulletinPostRepository.existsById(postId)) {
            bulletinPostRepository.deleteById(postId);
            return "Bulletin Post " + postId + " has been deleted.";
        } else {
            return "Bulletin Post " + postId + " does not exist.";
        }
    }

    public void handleVote(int postId, int userId, boolean isUpvote) {
        BulletinPostEntity post = bulletinPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Get the user's previous vote
        VoteType previousVote = post.getUserVoteType(userId);

        if (previousVote == VoteType.UPVOTE) {
            if (!isUpvote) {
                // User is changing from upvote to downvote
                post.decrementUpvoteCount();
                post.incrementDownvoteCount();
            }
            // If it's still an upvote, no change is needed
        } else if (previousVote == VoteType.DOWNVOTE) {
            if (isUpvote) {
                // User is changing from downvote to upvote
                post.decrementDownvoteCount();
                post.incrementUpvoteCount();
            }
            // If it's still a downvote, no change is needed
        } else {
            // User hasn't voted yet
            if (isUpvote) {
                post.incrementUpvoteCount();
            } else {
                post.incrementDownvoteCount();
            }
        }

        // Update the user's vote in the post
        post.updateUserVote(userId, isUpvote ? VoteType.UPVOTE : VoteType.DOWNVOTE);

        bulletinPostRepository.save(post);
    }
}
