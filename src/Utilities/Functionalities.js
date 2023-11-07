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
