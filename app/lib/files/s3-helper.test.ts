import { decodeS3Uri, encodeS3Object } from "./s3-helper"

describe('encoding an s3 object', () => {
    it('should encode an s3 object', () => {
        expect(encodeS3Object({
            bucketName: 'bucket', 
            objectName: 'object'
        })).toBe('s3://bucket/object');
    })

    it('should encode an s3 object with nested paths', () => {
        expect(encodeS3Object({
            bucketName: 'bucket', 
            objectName: 'root/nested/object.bin'
        })).toBe('s3://bucket/root/nested/object.bin');
    })
})

describe('decoding an s3 uri', () => {
    it('should decode an s3 uri', () => {
        expect(decodeS3Uri('s3://bucket/object')).toEqual({ bucketName: 'bucket', objectName: 'object' });
    })

    it('should decode an s3 uri with nested paths', () => {
        expect(decodeS3Uri('s3://bucket/root/nested/object.bin')).toEqual({ bucketName: 'bucket', objectName: 'root/nested/object.bin' });
    })

    it('should return null when the uri is not an s3 uri', () => {
        expect(decodeS3Uri('https://bucket/object')).toBeNull();
    })

    it('should return null when the uri is not a valid url', () => {
        expect(decodeS3Uri('s3://bucket')).toBeNull();
    })

    it('should return null when the uri is null', () => {
        expect(decodeS3Uri(null)).toBeNull();
    })
});