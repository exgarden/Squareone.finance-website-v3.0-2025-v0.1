import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import darkTextLogo from '../assets/lighttextsquareonelogo.svg'; // Import the logo file
import lightTextLogo from '../assets/darktextsquareonelogo.svg'; // Import the light theme logo file

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

// Adjusted size mappings
const sizes = {
  small: { width: 100, fontSize: 'text-sm', spacing: 'space-x-1.5' }, // Width for small
  medium: { width: 150, fontSize: 'text-lg', spacing: 'space-x-2' }, // Width for medium
  large: { width: 210, fontSize: 'text-xl', spacing: 'space-x-3' }, // Width for large
};

const Logo = ({ size = 'large' }: LogoProps) => {
  const { theme } = useContext(ThemeContext);

  // Destructure the properties correctly
  const { width, spacing } = sizes[size];

  // Determine the logo file based on the theme
  const logoFile = theme === 'dark' ? darkTextLogo : lightTextLogo;

  return (
    <div className={`flex items-center ${spacing} cursor-pointer`}>
      {/* Logo Image */}
      <img
        src={logoFile}
        alt="SquareOne Logo"
        style={{ width: `${width}px`, height: 'auto' }} // Respect aspect ratio
      />
    </div>
  );
};

export default Logo;
