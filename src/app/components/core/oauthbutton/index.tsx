'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    type: 'google' | 'github';
}

function OAuthButton({ type } : Props) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleOAuthClick = () => {
        setLoading(true);
        router.push(`/api/auth/${type}`);
    }

    return (
        <button
            onClick={handleOAuthClick}
            type="button"
            className="w-full px-8 py-4 text-xl transition-all hover:opacity-85 flex items-center gap-4 justify-center placeholder:text-[#989898] text-[16px] text-white bg-[#303030] rounded-full outline-none"
            disabled={loading}
        >
            {loading ? (
                <div className="w-[30px] h-[30px] border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
                <>
                    <Image
                        src={type === 'google' ? '/google.png' : '/github.svg'}
                        alt={`${type}-icon`}
                        width={30}
                        height={30}
                    />
                    <span className="mr-2">
                        {type === 'google' ? 'Google' : 'GitHub'}
                    </span>
                </>
            )}
        </button>
    );
}

export default OAuthButton;