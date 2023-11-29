"use client";
import { useAuth } from "@/useContext/UseContext";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const BulletinPost = ({ post, onDelete }) => {
  const postDate = new Date(...post.postDate);
  const formattedDate = postDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const profileImageSrc = `data:image/${post.admin.imageFormat};base64,${post.admin.profileImage}`;

  // Handler for deleting a post
  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (shouldDelete) {
      onDelete(post.postId);
    }
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 my-4 w-11/12"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      <div className="flex items-center space-x-4">
        <img
          src={profileImageSrc}
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
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
            <img
              src="/images/arr-down.png"
              alt="Downvote"
              className="w-6 h-6"
            />
          </button>
          <span className="text-gray-700 mx-2">{post.downvoteCount}</span>
          <button
            className="text-gray-500 focus:outline-none focus:text-gray-600"
            onClick={handleDelete}
          >
            <img src="admin/del.png" alt="Delete" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const BulletinBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const { user } = useAuth();
  const adminId = user.id;

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for new post title and description
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/bulletin/getAllBulletinPosts"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

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

  useEffect(() => {
    fetchPosts();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePost = async () => {
    const shouldPost = window.confirm("Are you sure you want to post this?");
    if (shouldPost) {
      try {
        // Get the current date and time in the desired format
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth()).padStart(2, '0'); // Add 1 to month since it's zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        
        // Format the date and time string
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        
        const response = await fetch(
          `http://localhost:8080/bulletin/createPost?adminId=${adminId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              postTitle: newPostTitle || "Default Title",
              postDescription: newPostDescription || "Default Description",
              postDate: formattedDate, // Use the formatted date and time
            }),
          }
        );
  
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          const errorResponse = await response.json();
          console.error("Server response:", errorResponse);
          throw new Error("Failed to post.");
        }
  
        // Fetch updated posts after posting
        fetchPosts();
  
        // Clear input fields after posting
        setNewPostTitle("");
        setNewPostDescription("");
      } catch (error) {
        console.error("Failed to post:", error);
      }
    }
  };
  
  
  

  // Function to handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/bulletin/deletePost/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error("Failed to delete post.");
      }

      // Fetch updated posts after deletion
      fetchPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.postTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = post.postDescription
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || descriptionMatch;
  });

  // Get the current posts for the current page
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="w-full h-full">
      <header
        className="h-72 w-full mb-12 bg-cover text-black"
        style={{ backgroundImage: 'url("images/community-header.png")' }}
      >
        <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
          <h1 className="font-bold text-6xl">Community Bulletin</h1>
          <span className=" flex justify-center font-small text-lg mt-2 mr-96">
            Stay informed and engaged here. Discover the latest announcements,
            upcoming events, and important news within our barangay. A central
            hub for community updates, ensuring you're always connected to what
            matters in our vibrant neighborhood.
          </span>
        </div>
      </header>
      <div
        className="h-full w-full bg-cover"
        style={{ backgroundImage: 'url("images/logo1 2.png")' }}
      >
        <div
          className="w-90% mx-12 bg-white p-2 mb-2 rounded-md shadow-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-600"
          >
            Search:
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
            />
            <button
              type="button"
              onClick={() => paginate(1)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium"
            >
              Search
            </button>
          </div>
        </div>
        {/* New Post Form */}
        <div
          className="w-90% mx-12 bg-white p-2 mb-12 rounded-md shadow-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <textarea
            id="postTitle"
            name="postTitle"
            rows="1"
            placeholder="Subject"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="my-2 p-2 block w-full border focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300 resize-none"
          ></textarea>
          <textarea
            id="postDescription"
            name="postDescription"
            rows="3"
            placeholder="Write a post..."
            value={newPostDescription}
            onChange={(e) => setNewPostDescription(e.target.value)}
            className="my-2 p-2 block w-full border focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300 resize-none"
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={handlePost}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#3F948B] hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            >
              Post
            </button>
          </div>
        </div>
        {/* Display Posts */}
        <div className="h-full w-full flex justify-center items-center flex-col">
          {searchTerm && (
            <div className="text-lg font-semibold mb-4">
              Search results for "{searchTerm}":
            </div>
          )}
          {currentPosts.map((post) => (
            <BulletinPost
              key={post.postId}
              post={post}
              onDelete={handleDeletePost}
            />
          ))}
          <div className="flex mt-4">
            <button
              onClick={prevPage}
              className="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Prev
            </button>
            <button
              onClick={nextPage}
              className="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinBoard;
