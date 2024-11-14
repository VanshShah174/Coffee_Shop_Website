import React from "react";

const Blog = () => {
  return (
    <section id="blog" className="max-w-screen-xl mx-auto py-16 text-center">
      <h2 className="text-4xl font-playfair text-[#6f4e37] mb-8">Latest News</h2>
      <div className="space-y-8">
        <article className="bg-[#f5e6d3] p-6 rounded-lg">
          <h3 className="text-2xl font-semibold">New Seasonal Blend</h3>
          <p>Try our new autumn-inspired coffee blend, available for a limited time!</p>
        </article>
        <article className="bg-[#f5e6d3] p-6 rounded-lg">
          <h3 className="text-2xl font-semibold">Barista Championship</h3>
          <p>Our head barista won first place in the city's annual barista championship!</p>
        </article>
      </div>
    </section>
  );
};

export default Blog;
