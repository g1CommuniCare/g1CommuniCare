package com.example.demo.DTO;

import java.time.LocalDateTime;

public class BulletinPostDTO {
    private int postId;
    private String postDescription;
    private LocalDateTime postDate;
    private String postTitle;
    private int upvoteCount;
    private int downvoteCount;
    private boolean active;
    
    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getPostDescription() {
        return postDescription;
    }

    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    public LocalDateTime getPostDate() {
        return postDate;
    }

    public void setPostDate(LocalDateTime postDate) {
        this.postDate = postDate;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public int getUpvoteCount() {
        return upvoteCount;
    }

    public void setUpvoteCount(int upvoteCount) {
        this.upvoteCount = upvoteCount;
    }

    public int getDownvoteCount() {
        return downvoteCount;
    }

    public void setDownvoteCount(int downvoteCount) {
        this.downvoteCount = downvoteCount;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public BulletinPostDTO() {
    }

    public BulletinPostDTO(int postId, String postDescription, LocalDateTime postDate, String postTitle,
            int upvoteCount, int downvoteCount, boolean active) {
        this.postId = postId;
        this.postDescription = postDescription;
        this.postDate = postDate;
        this.postTitle = postTitle;
        this.upvoteCount = upvoteCount;
        this.downvoteCount = downvoteCount;
        this.active = active;
    }



    
}

