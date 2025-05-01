
    import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

    const Footer = () => {
    return (
    <section>
        <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Mandaliq BookStorage. All rights reserved.</p>
            <div className="flex space-x-4">
            <a
                href="https://instagram.com/alviindamanik_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors"
            >
                <FaInstagram size={20} />
            </a>

            <a
                href="https://www.linkedin.com/in/poda-damanik-undefined-7b227b301/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors"
            >
                <FaLinkedinIn size={20} />
            </a>
            </div>
        </div>
        </footer>
    </section>
        
    );
    };

    export default Footer;
