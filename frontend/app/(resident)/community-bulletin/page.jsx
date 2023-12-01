"use client";
import { useAuth } from '@/useContext/UseContext';
import React, { useEffect, useState } from 'react';

// This is a component for an individual bulletin post
const BulletinPost = ({ post, user, posts, setPosts }) => {
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

  // Click handler for upvote button
  const handleUpvote = async () => {
    try {
      const response = await fetch(`http://localhost:8080/bulletin/upvote/${post.postId}/${user.residentId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the upvote count in the UI
      const updatedPosts = posts.map((p) => {
        if (p.postId === post.postId) {
          return {
            ...p,
            upvoteCount: p.upvoteCount + 1,
            downvoteCount: p.userVoteType === 'DOWNVOTE' ? p.downvoteCount - 1 : p.downvoteCount,
            userVoteType: 'UPVOTE', // You can update the user's vote type here
          };
        }
        return p;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error('Failed to upvote post:', error);
    }
  };

  // Click handler for downvote button
  const handleDownvote = async () => {
    try {
      const response = await fetch(`http://localhost:8080/bulletin/downvote/${post.postId}/${user.residentId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the downvote count in the UI
      const updatedPosts = posts.map((p) => {
        if (p.postId === post.postId) {
          return {
            ...p,
            upvoteCount: p.userVoteType === 'UPVOTE' ? p.upvoteCount - 1 : p.upvoteCount,
            downvoteCount: p.downvoteCount + 1,
            userVoteType: 'DOWNVOTE', // You can update the user's vote type here
          };
        }
        return p;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error('Failed to downvote post:', error);
    }
  };

  return (
    <div className="bg-[#FFFFFFCC] shadow-lg rounded-lg p-6 my-4 w-full">
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
          <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={handleUpvote}>
            <img src="/images/arr-up.png" alt="Upvote" className="w-6 h-6" />
          </button>
          <span className="text-gray-700 mx-2">{post.upvoteCount}</span>
          <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={handleDownvote}>
            <img src="/images/arr-down.png" alt="Downvote" className="w-6 h-6" />
          </button>
          <span className="text-gray-700 mx-2">{post.downvoteCount}</span>
        </div>
      </div>
    </div>
  );
};

// Main page component
export default function Page() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 3;

  const { user } = useAuth();
  const id = user.residentId;
  console.log("resident id: ", id);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
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
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      post.postTitle.toLowerCase().includes(searchLower) ||
      post.postDescription.toLowerCase().includes(searchLower)
    );
  });

  // Paginate the filtered posts
  const indexOfLastFilteredPost = currentPage * postsPerPage;
  const indexOfFirstFilteredPost = indexOfLastFilteredPost - postsPerPage;
  const currentFilteredPosts = filteredPosts.slice(indexOfFirstFilteredPost, indexOfLastFilteredPost);

  return (
    <div className="w-full min-h-full">
      <header
        className="h-96 w-full bg-cover text-black"
        style={{ backgroundImage: 'url("images/community-header.png")' }}
      >
        <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
          <h1 className="font-bold text-6xl">Community Bulletin</h1>
          <span className="flex justify-center font-small text-lg mt-2 mr-96">
            Stay informed and engaged here. Discover the latest announcements,
            upcoming events, and important news within our barangay. A central
            hub for community updates, ensuring you're always connected to what
            matters in our vibrant neighborhood.
          </span>
        </div>
      </header>
      <div
        className="w-full bg-cover flex justify-center items-center flex-col"
        style={{ backgroundImage: 'url("images/logo1 2.png")' }}
      >
        <div className="w-11/12 mt-24 flex mb-8 flex-col justify-center items-center">
        <div
          className="w-full bg-[#FFFFFFCC] p-2  rounded-md shadow-md"
        >
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-600"
          >
            Search:
          </label>
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full p-2 border rounded"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="h-full w-full flex justify-center items-center flex-col">
          {searchQuery && (
            <div className="text-lg font-semibold mt-6 mb-4">
              Search results for "{searchQuery}":
            </div>
          )}
          {currentFilteredPosts.map((post) => (
            <BulletinPost key={post.postId} post={post} user={user} posts={posts} setPosts={setPosts} />
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
      </div>
    </div>
  );
}