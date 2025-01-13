export const truncateText = ( text, maxLength = 50) => {
    if( text.maxLength <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}