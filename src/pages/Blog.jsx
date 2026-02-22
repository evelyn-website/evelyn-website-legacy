import { useState } from "react";

function Blog() {
  const [expandedPost, setExpandedPost] = useState(null);

  const togglePost = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const blogPosts = [
    {
      id: "post1",
      date: "August 2025",
      title: "Things I had to think about making a chat UI",
      excerpt: "everything has to be perfect",
      content: [
        "I'm working on two different apps with chat UIs. One is Bundle, which is my big project that I've been working on for about a year. The other is Give Me the Aux, which I basically threw together quickly (read: vibe coded). Give Me the Aux isn't really about chat. It's a game about music, but it has to have chat. For this, I was basically comfortable with the idea of just going as simple as possible. Long polling, no websockets, no push notifications, no encryption, no images. I just wanted it to work. Even still, there's just a crazy amount of stuff you need to get right. I still don't really feel like I've mastered it. I'm sure I'll be back here in a few months to write about it again.",
        "Even for a simple chat UI without all those features I mentioned, there's so much you have to think about.",
      ],
      tags: ["technology", "mobile", "ui"],
    },
  ];

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
              onClick={() => togglePost(post.id)}
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
                  {post.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
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
