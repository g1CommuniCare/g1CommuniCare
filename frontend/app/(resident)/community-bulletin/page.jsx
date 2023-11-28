"use client";
import { useAuth } from '@/useContext/UseContext';
import React, { useEffect, useState } from 'react';

// This is a component for an individual bulletin post
const BulletinPost = ({ post }) => {
    // Convert postDate array to a Date object and format it
    const postDate = new Date(...post.postDate);
    const formattedDate = postDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  // Decode the base64 profile image
  const profileImageSrc = `data:image/${post.admin.imageFormat};base64,${post.admin.profileImage}`;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-4 w-3/4">
      <div className="flex items-center space-x-4">
        <img src={profileImageSrc} alt="Profile" className="w-16 h-16 rounded-full" />
        <div>
          <div className="font-semibold">{`${post.admin.firstName} ${post.admin.middleInitial} ${post.admin.lastName}`}</div>
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-lg font-bold">{post.postTitle}</div>
        <div className="mt-2 text-gray-700">{post.postDescription}</div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="ml-auto flex items-center">
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                <img src="/images/arr-up.png" alt="Upvote" className="w-6 h-6" />
            </button>
                <span className="text-gray-700 mx-2">{post.upvoteCount}</span>
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                <img src="/images/arr-down.png" alt="Downvote" className="w-6 h-6" />
            </button>
          <span className="text-gray-700 mx-2">{post.downvoteCount}</span>
        </div>
      </div>
    </div>
  );
};

// Main page component
export default function page() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    
    const { user } = useAuth();
    const username = user.username
    console.log(username)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Go to the next page
    const nextPage = () => {
        if (currentPage < Math.ceil(posts.length / postsPerPage)) {
            setCurrentPage(prev => prev + 1);
        }
    };

    // Go to the previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };
    
    useEffect(() => {
      // Fetch the posts from the API using the native fetch API
      const fetchPosts = async () => {
        try {
          const response = await fetch('http://localhost:8080/bulletin/getAllBulletinPosts');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          // Sort the posts by postDate in descending order (most recent first)
          data.sort((a, b) => {
            const dateA = new Date(...a.postDate);
            const dateB = new Date(...b.postDate);
            return dateB - dateA;
          });
          
          setPosts(data);
          console.log(data);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      };
  
      fetchPosts();
    }, []);

  
    return (
        <div className="w-full h-full">
            <header
                className="h-72 w-full bg-cover text-black"
                style={{ backgroundImage: 'url("images/community-header.png")' }}
            >
                <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
                    <h1 className="font-bold text-6xl">
                    Community Bulletin
                    </h1>
                    <span className=" flex justify-center font-small text-lg mt-2 mr-96">
                    Stay informed and engaged here. Discover the latest announcements, upcoming events, and important news within our barangay. A central hub for community updates, ensuring you're always connected to what matters in our vibrant neighborhood.
                    </span>
                </div>
            </header>
            <div className="h-full w-full bg-cover flex justify-center items-center flex-col"
                  style={{ backgroundImage: 'url("images/logo1 2.png")' }}
            >
                {currentPosts.map((post) => (
                    <BulletinPost key={post.postId} post={post} />
                ))}
                <div className="flex mt-4">
                    <button onClick={prevPage} className="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Prev
                    </button>
                    <button onClick={nextPage} className="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Next
                    </button>
                </div>
            </div>
        </div>
      );
  }
  