"use client";
import ModalOverlay from "@/app/utils/admin/ModalOverlay";
import ConfirmationPopup from "@/app/utils/ConfirmationPupUp";
import { useAuth } from "@/useContext/UseContext";
import { useEffect, useState } from "react";

const BulletinPost = ({ post, onDelete, onEdit, fetchPosts }) => {
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

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [editedTitle, setEditedTitle] = useState(post.postTitle);
  const [editedContent, setEditedContent] = useState(post.postDescription);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const openEditForm = () => {
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
  };

  const handleEdit = async () => {
    setShowConfirmation(true);
  };

  const applyChanges = async () => {
    setShowConfirmation(false);
    try {
      const response = await fetch(
        `http://localhost:8080/bulletin/update/${
          post.postId
        }?title=${encodeURIComponent(editedTitle)}&content=${encodeURIComponent(
          editedContent
        )}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error("Failed to edit post.");
      }

      // Call the fetchPosts callback to update posts after editing
      fetchPosts();

      // Close the edit form after a successful edit
      closeEditForm();
    } catch (error) {
      console.error("Failed to edit post:", error);
    }
  };

  const handleDeleteClick = () => setShowDeleteConfirmation(true);
  const handleConfirmDelete = () => {
    onDelete(post.postId);
    setShowDeleteConfirmation(false);
  };
  const handleCancelDelete = () => setShowDeleteConfirmation(false);

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 my-4 w-full"
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
        <div className="ml-auto flex items-center flex-col">
          <div className="ml-auto flex items-center">
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
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
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
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

            <div className="ml-auto flex items-center">
              <span className="text-gray-700 mx-2">{post.downvoteCount}</span>
            </div>
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={handleDeleteClick}
            >
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
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </button>
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-600 mx-2"
              onClick={openEditForm}
            >
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form Pop-up */}
      {isEditing && (
        // <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-gray-200 bg-opacity-40">
        <ModalOverlay>
          <div
            className="w-4/12 rounded-3xl border border-emerald-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 transform scale-100 transition-transform ease-in-out duration-300"
            role="alert"
          >
            <div className="flex items-center gap-4">
              <p className="font-bold text-xl sm:text-3xl mb-4">Edit Post</p>
            </div>

            <div className="mt-4 w-full">
              {/* Editable fields */}
              <label
                htmlFor="editedTitle"
                className="block text-sm font-bold text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="editedTitle"
                name="editedTitle"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />

              <label
                htmlFor="editedContent"
                className="block text-sm font-bold text-gray-700 mt-4"
              >
                Content:
              </label>
              <textarea
                id="editedContent"
                name="editedContent"
                rows="5"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="peer w-full h-28 py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              ></textarea>

              {/* Save and Cancel buttons */}
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={closeEditForm}
                  className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-block w-full rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          </ModalOverlay>
        // </div>
      )}
      {/* Second Confirmation Pop-up */}
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to push through this action?"
          onConfirm={applyChanges}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      {showDeleteConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to delete this post?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

const BulletinBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handleConfirm = () => {
    // Handle post confirmation logic here
    handlePost();
    setShowConfirmationPopup(false);
  };

  const handleCancel = () => {
    setShowConfirmationPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmationPopup(true);
  };

  const handlePost = async () => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth()).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      const response = await fetch(
        `http://localhost:8080/bulletin/createPost?adminId=${user.adminId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postTitle: newPostTitle,
            postDescription: newPostDescription,
            postDate: formattedDate,
          }),
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        const errorResponse = await response.json();
        console.error("Server response:", errorResponse);
        throw new Error("Failed to post.");
      }

      fetchPosts();

      setNewPostTitle("");
      setNewPostDescription("");
    } catch (error) {
      console.error("Failed to post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/bulletin/${postId}/delete`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error("Failed to soft delete post.");
      }

      fetchPosts();
    } catch (error) {
      console.error("Failed to soft delete post:", error);
    }
  };

  const handleEditPost = async (postId) => {
    const postToEdit = posts.find((post) => post.postId === postId);
    if (postToEdit) {
      const newTitle = prompt("Enter new title:", postToEdit.postTitle);
      const newContent = prompt(
        "Enter new content:",
        postToEdit.postDescription
      );

      if (newTitle !== null && newContent !== null) {
        try {
          const response = await fetch(
            `http://localhost:8080/bulletin/update/${postId}?title=${encodeURIComponent(
              newTitle
            )}&content=${encodeURIComponent(newContent)}`,
            {
              method: "PUT",
            }
          );

          if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error("Failed to edit post.");
          }

          fetchPosts();
        } catch (error) {
          console.error("Failed to edit post:", error);
        }
      }
    }
  };

  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.postTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = post.postDescription
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || descriptionMatch;
  });

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="w-full h-full">
      <header
        className="h-72 w-full bg-cover text-black"
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
        className="h-full w-full bg-cover flex justify-center items-center flex-col"
        style={{ backgroundImage: 'url("images/logo1 2.png")' }}
      >
        <div className="w-11/12 mt-12 mb-8 flex flex-col justify-center items-center">
          <div className="w-full mx-12 bg-[#FFFFFFCC] p-2 mb-2 rounded-md shadow-md">
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
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-md border-gray-300"
              />
            </div>
          </div>
          {/* New Post Form */}
          <div
            className="w-full mx-12 bg-white p-2 mb-12 rounded-md shadow-md"
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
                onClick={handleSubmit}
                className="inline-block w-full rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
              >
                Post
              </button>
            </div>
          </div>
          {showConfirmationPopup && (
            <ConfirmationPopup
              message="Are you sure you want to post this? You may delete or edit this post anytime."
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
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
                onEdit={handleEditPost}
                fetchPosts={fetchPosts}
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
    </div>
  );
};

export default BulletinBoard;
