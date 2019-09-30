import * as fs from 'fs';

const FileCreator = (fileString: string, fileDirectory: string) => {
    fs.writeFileSync(fileDirectory, fileString);
};

export default FileCreator;
