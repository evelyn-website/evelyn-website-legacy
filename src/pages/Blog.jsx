import { useState } from "react";

const blogPosts = [
  {
    id: "chat-ui",
    date: "August 2025",
    title: "Things I had to think about making a chat UI",
    excerpt: "everything has to be perfect",
    tags: ["technology", "mobile", "ui"],
    file: "/blog/chat-ui.md",
  },
];

function Blog() {
  const [expandedPost, setExpandedPost] = useState(null);
  const [loadedContent, setLoadedContent] = useState({});

  const togglePost = (postId, file) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
      return;
    }
    setExpandedPost(postId);
    if (!loadedContent[postId]) {
      fetch(file)
        .then((res) => res.text())
        .then((text) => {
          setLoadedContent((prev) => ({ ...prev, [postId]: text }));
        });
    }
  };

  const renderContent = (text) => {
    return text
      .split(/\n\n+/)
      .map((paragraph, i) => <p key={i}>{paragraph}</p>);
  };

  return (
    <div className="blog-container">
      <section className="section blog-header">
        <h2>blog posts</h2>
        <p className="blog-description">
          mostly things i'm wrting about technology
        </p>
      </section>

      <section className="section">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className={`blog-post ${
                expandedPost === post.id ? "expanded" : ""
              }`}
              onClick={() => togglePost(post.id, post.file)}
            >
              <div className="post-header">
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <button
                  className="expand-button"
                  aria-label="expand post content"
                >
                  <span className="expand-icon">
                    {expandedPost === post.id ? "−" : "+"}
                  </span>
                </button>
              </div>
              <div className="post-content">
                <div className="content-text">
                  {expandedPost === post.id && (
                    loadedContent[post.id] ? (
                      renderContent(loadedContent[post.id])
                    ) : (
                      <p>loading...</p>
                    )
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blog;
