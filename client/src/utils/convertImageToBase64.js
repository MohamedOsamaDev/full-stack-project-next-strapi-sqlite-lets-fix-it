export async function convertImageToBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    const base64Data = await new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    return base64Data;
  } catch (error) {
    return null;
  }
}
