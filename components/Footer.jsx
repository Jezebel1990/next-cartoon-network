import Image from 'next/image';

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="py-4 sticky top-0 backdrop-blur-xl bg-[rgba(0,0,0,0.6)] border-b border-slate-600 z-50">
            <div className="flex flex-col items-center justify-center text-center text-white space-y-1 px-4">
                <div className="flex flex-col items-center justify-center mt-2">
                    <h2 className="flex items-center justify-center">
                        <span className="whitespace-nowrap">
                            Cartoon Network | The ultimate destination for 
                        </span>
                    </h2>
                    <h2 className="flex items-center justify-center">
                        <span className="whitespace-nowrap">fans of timeless cartoons!</span>
                        <Image
                            src="/logo.png"
                            alt="Cartoon Network"
                            width={30}
                            height={10}
                            className="ml-2"
                        />
                    </h2>
                </div>
                <div className="flex items-center">
                    <Image
                        src="/logo_2.svg"
                        alt="Cartoon Network"
                        width={80} 
                        height={40} 
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                </div>
                <p className="text-xs sm:text-sm mt-2" style={{ fontSize: '0.625rem' }}>
                    Cartoon Network™ and ⓒ {year}. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};
