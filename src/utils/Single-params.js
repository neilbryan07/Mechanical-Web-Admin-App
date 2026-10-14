const SingleDeserializer = {
    objectToParams: (obj) => {
        if (!obj || Object.keys(obj).length === 0) {
            return ""; // Handle empty or null objects
        }

        const result = Object.values(obj).map(value => {
            // Encode values for URL safety (important!)
            return encodeURIComponent(value);
        });

        return result.join("&");
    }
};

export default SingleDeserializer;