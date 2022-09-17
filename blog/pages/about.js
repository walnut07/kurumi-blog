import md from 'markdown-it';
import fs from 'fs';

export async function getStaticProps() {
  const post = fs.readFileSync('pages/about.md', 'utf-8');
  return {
    props: {
      post,
    },
  }
}
function About({ post }) {
  return (
    <div className='prose mx-auto'>
      <div dangerouslySetInnerHTML={{ __html: md().render(post) }} />
    </div>
  );
}

export default About;