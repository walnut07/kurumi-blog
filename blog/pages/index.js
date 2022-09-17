import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

export async function getStaticProps() {
  const files = fs.readdirSync('posts');
  let posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  posts.sort((a, b) => {
    return Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date);
  })

  return {
    props: {
      posts,
    },
};
}

export default function Home({ posts }) {
  return (
      <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-1 lg:p-5'>
        {posts.map(({ slug, frontmatter }) => (
          <div
            key={slug}
            className='border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-indigo-200'
          >
            <Link href={`/post/${slug}`}>
              <a>
                <Image
                  width={650}
                  height={340}
                  alt={frontmatter.title}
                  src={`/${frontmatter.socialImage}`}
                />
                <h1 className='pl-4'>{frontmatter.title}</h1>
                <span className='pl-4 text-sm tracking-tighter text-stone-400'>{frontmatter.date}</span>
              </a>
            </Link>
          </div>
        ))}
      </section>
  );
}
