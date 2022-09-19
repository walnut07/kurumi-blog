import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import HighlightPop from 'react-highlight-pop';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import React from 'react';
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      slug,
      frontmatter,
      content,
    },
  };
}

export default function PostPage({ slug, frontmatter, content }) {
  const router = useRouter();

  const shareOnTwitter = () => {
    const selectedArea = document.getSelection();
    const selectedText = String(selectedArea);
    const link = `https://twitter.com/intent/tweet?text=「${selectedText}」https://www.walnut07.com/post/${slug}`;
    window.open (link, '_ blank');
  }

  const copyToClipBoard = () => {
    const selectedArea = document.getSelection();
    const selectedText = String(selectedArea);
    navigator.clipboard.writeText(selectedText);
  }

  const popover = (
    <Popover id="popover-basic" className="bg-blue-300 m-1 p-1 rounded-md text-white">
      <Popover.Header>Copied!</Popover.Header>
    </Popover>
  );

  return (
    <div className='prose mx-auto'>
      <HighlightPop className="px-1" popoverItems={itemClass => (
        <React.Fragment>
          <svg
            onClick={shareOnTwitter}
            className="w-6 h-6 text-blue-300 fill-current cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
            />
          </svg>

          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <svg 
              onClick={copyToClipBoard}
              className="w-6 h-6 text-blue-200 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </OverlayTrigger>
        </React.Fragment>
      )}>
        <h1>{frontmatter.title}</h1>
        <span>{frontmatter.date}</span>
        {frontmatter.tags && frontmatter.tags.map(tag => {
          return <button key={tag} className='rounded bg-indigo-100 hover:bg-indigo-200 px-1 mx-2'>{tag}</button>
        })}
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </HighlightPop>
    </div>
  );
}