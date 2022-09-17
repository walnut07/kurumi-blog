import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col min-h-screen text-slate-800'>
      <header className='flex flex-row justify-between bg-indigo-100 mb-8 p-4 lg:px-10'>
        <Link href='/' className=''>
          <a className='hover:text-blue-700'>Kurumi&apos;s Blog</a>
        </Link>
        <Link href='/about'>
          <a className='text-right hover:text-blue-700'>About Me</a>
        </Link>
      </header>
      <main className='container mx-auto p-2 flex-1'>{children}</main>
      <footer className='bg-indigo-100 mt-8 py-4 text-slate-800'>
        <div className='container mx-auto flex justify-center'>
          &copy; 2022 Kurumi Muto
        </div>
      </footer>
    </div>
  );
}