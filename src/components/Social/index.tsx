import { ReactNode } from 'react'

interface SocialProps{
    url: string
    children: ReactNode
}

const Social = ({ url, children }:SocialProps) => {

    return (
        <a  href={url}
            rel='noopener noreferrer' 
            target='blank'>
            {children}
        </a>
    )
}

export default Social