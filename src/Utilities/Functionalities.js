export function formatLongDescription(longDescription) {
    const output = longDescription.split("\n\n");

    let final = [];

    for (let index = 0; index < output.length; index++) {
        let element = output[index];

        if (element.startsWith("**")) {
            element = element.replaceAll("**", "");

            final.push({ heading: element });
        } else {
            element = element.replaceAll("**", "");
            final.push({ description: element });
        }
    }

    return final;
}

export function categoryFormatter(category) {
    if (category === "artificial_intelligence") {
        return "Artificial Intelligence";
    } else if (category === "web_development") {
        return "Web Development";
    } else if (category === "data_science") {
        return "Data Science";
    } else if (category === "cybersecurity") {
        return "Cybersecurity";
    } else if (category === "robotics") {
        return "Robotics";
    } else {
        return category;
    }
}
