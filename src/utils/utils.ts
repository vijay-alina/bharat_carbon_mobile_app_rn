export const getLineHeight = (fontSize: number, percentage: number) => {
    const lineHeight = fontSize * (percentage / 100);
    return lineHeight;
};
