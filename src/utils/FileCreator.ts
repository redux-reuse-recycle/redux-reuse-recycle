import fs from "fs-extra";

const FileCreator = (fileString: string, fileDirectory: string, fileName: string) => {
    if (fileString !== '') fs.outputFileSync(fileDirectory + `/${fileName}`, fileString);
};

export default FileCreator;
