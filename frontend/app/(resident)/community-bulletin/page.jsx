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
          <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
          </button>
          <span className="text-gray-700 mx-2">{post.upvoteCount}</span>
          <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={handleDownvote}>
          <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                />
              </svg>
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