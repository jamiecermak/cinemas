import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type S3Object = {
    bucketName: string;
    objectName: string;
};

export function encodeS3Object({ bucketName, objectName}: S3Object): string {
    return `s3://${bucketName}/${objectName}`;
}

export function decodeS3Uri(uri: string | null): S3Object | null {
    if (uri === null) return null;

    if (!URL.canParse(uri)) return null;

    const url = new URL(uri);

    if (url.protocol !== "s3:") return null;

    const objectName = url.pathname.slice(1);

    if (objectName.length === 0) return null;

    return {
        bucketName: url.hostname,
        objectName: url.pathname.slice(1),
    };
}

export async function presignS3Object({ bucketName, objectName }: S3Object) {
    const client = new S3Client();
    const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectName,
    });

    const url = await getSignedUrl(client, getCommand, { expiresIn: 3600})

    return url;
}