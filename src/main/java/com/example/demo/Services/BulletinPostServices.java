package com.example.demo.Services;

import com.example.demo.Entity.AdminEntity;
import com.example.demo.Entity.BulletinPostEntity;
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
        if(bulletinPostRepository.existsById(postId)){
            bulletinPostRepository.deleteById(postId);
            return "Bulletin Post " + postId + " has been deleted.";
        }
        else{
            return "Bulletin Post " + postId + " does not exist.";
        }
    }

    public String upvoteBulletinPost(int postId) {
        Optional<BulletinPostEntity> optionalPost = bulletinPostRepository.findById(postId);
        if (optionalPost.isPresent()) {
            BulletinPostEntity post = optionalPost.get();
            post.setUpvoteCount(post.getUpvoteCount() + 1);
            bulletinPostRepository.save(post);
            return "Upvoted Bulletin Post " + postId;
        }
        else{
            return "Bulletin Post " + postId + " does not exist.";
        }
    }

    public String downvoteBulletinPost(int postId) {
        Optional<BulletinPostEntity> optionalPost = bulletinPostRepository.findById(postId);
        if (optionalPost.isPresent()) {
            BulletinPostEntity post = optionalPost.get();
            post.setDownvoteCount(post.getDownvoteCount() + 1);
            bulletinPostRepository.save(post);
            return "Downvoted Bulletin Post " + postId;
        }
        else{
            return "Bulletin Post " + postId + " does not exist.";
        }
    }
}
