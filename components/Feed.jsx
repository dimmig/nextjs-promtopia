"use client";
import { useState, useEffect, useRef } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [beforeSearchPosts, setBeforeSearchPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const inputRef = useRef(null)


  const handleSearchChange = (e) => {
    let filtredPosts = null
    if (e.target) {
    if (e.target.value.length === 0) {
      return setPosts(beforeSearchPosts)
    }

     filtredPosts = posts.filter(post => post.prompt.toLowerCase().includes(e.target.value.toLowerCase()) 
                          || post.tag.toLowerCase().includes(e.target.value.toLowerCase()))
  } else {
filtredPosts = posts.filter(post => post.prompt.toLowerCase().includes(e.toLowerCase()) 
|| post.tag.toLowerCase().includes(e.toLowerCase()))
  }

    setPosts(filtredPosts)
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setBeforeSearchPosts(data)
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for prompts"
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={(tag) => {
        inputRef.current.value = tag
        handleSearchChange(tag)
      }} />
    </section>
  );
};

export default Feed;
