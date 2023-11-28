package com.example.demo.Entity;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import javax.persistence.Table;

import com.example.demo.DTO.BulletinPostDTO;

@Entity
@Table(name = "bulletin_post")
public class BulletinPostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    @Column(name = "post_description", length = 1250)
    private String postDescription;

    @Column(name = "post_date", nullable = false)
    private LocalDateTime postDate;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "admin_id", nullable = false)
    private AdminEntity admin;

    @Column(name = "post_title")
    private String postTitle;

    @Column(name = "upvote_count")
    private int upvoteCount;

    @Column(name = "downvote_count")
    private int downvoteCount;

    @ElementCollection
    @CollectionTable(name = "user_votes", joinColumns = @JoinColumn(name = "post_id"))
    @MapKeyColumn(name = "user_id")
    @Column(name = "vote_type")
    private Map<Integer, VoteType> userVotes = new HashMap<>();

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

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public AdminEntity getAdmin() {
        return admin;
    }

    public void setAdmin(AdminEntity admin) {
        this.admin = admin;
    }

    public boolean isActive() {
        return false;
    }

    public void setUpvoteCount(int upvoteCount) {
        this.upvoteCount = upvoteCount;
    }

    public int getUpvoteCount() {
        return upvoteCount;
    }

    public void setDownvoteCount(int downvoteCount) {
        this.downvoteCount = downvoteCount;
    }

    public int getDownvoteCount() {
        return downvoteCount;
    }

    public BulletinPostDTO toDTO() {
        BulletinPostDTO dto = new BulletinPostDTO();
        dto.setPostId(this.postId);
        dto.setPostDescription(this.postDescription);
        dto.setPostDate(this.postDate);
        dto.setPostTitle(this.postTitle);
        dto.setUpvoteCount(this.upvoteCount);
        dto.setDownvoteCount(this.downvoteCount);
        dto.setActive(this.isActive());
        return dto;
    }

    // Method to increment upvote count
    public void incrementUpvoteCount() {
        this.upvoteCount += 1;
    }

    // Method to decrement upvote count
    public void decrementUpvoteCount() {
        if (this.upvoteCount > 0) {
            this.upvoteCount -= 1;
        }
    }

    // Method to increment downvote count
    public void incrementDownvoteCount() {
        this.downvoteCount += 1;
    }

    // Method to decrement downvote count
    public void decrementDownvoteCount() {
        if (this.downvoteCount > 0) {
            this.downvoteCount -= 1;
        }
    }

    // Method to get the type of vote a user has made on this post
    public VoteType getUserVoteType(int userId) {
        return userVotes.getOrDefault(userId, VoteType.NONE);
    }

    // Method to update a user's vote
    public void updateUserVote(int userId, VoteType voteType) {
        userVotes.put(userId, voteType);

    }

    // Enum to represent vote types
    public enum VoteType {
        UPVOTE, DOWNVOTE, NONE
    }
}
