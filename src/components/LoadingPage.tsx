import Link from "next/link";
export default function LoadingPage() {
	return (
		<div className='flex flex-col items-center justify-between h-screen w-screen relative py-10 bg-black'>
			<div
				className='absolute top-0 left-0 w-full h-full z-1'
				style={{
					backgroundImage:
						"linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)",
				}}
			></div>

			<span className='text-white text-2xl'>Loading...</span>
		</div>
	);
}
