const postService = require('../../services/posts/posts.services');
const { constants } = require('../../utils');

describe('Posts', () => {
    describe('Create', () => {

        it('should return success false if article info and/or author are missing', async() => {
            const mockData = {
                articleHead: "",
                articleBody: "",
                author: ""
            };
            const Posts = jest.fn();
            postService({ Posts, constants });
            const response = await postService.create(mockData);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(400);
        });

        it('should return success false if function expect some error', async() => {
            const mockData = {
                articleHead: "Some head",
                articleBody: "Some body",
                author: "John Rambo"
            };
            const Posts = {
                create: jest.fn().mockImplementation(() => {
                    throw new Error("Error in module");
                })
            }
            postService({ Posts, constants });
            const response = await postService.create(mockData);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(0);
        });

        it('should return success true if post is created correctly', async() => {
            const mockData = {
                articleHead: "Some head",
                articleBody: "Some body",
                author: "John Rambo"
            };
            const Posts = {
                create: jest.fn().mockResolvedValue({
                    _id: "someObjectId",
                    articleHead: "Some head",
                    articleBody: "Some body",
                    author: "John Rambo",
                    createdAt: "2021-06-30T06:51:55.871Z",
                    updatedAt: "2021-06-30T06:51:55.871Z",
                    __v: 0
                })
            }
            postService({ Posts, constants });
            const response = await postService.create(mockData);
            expect(response.success).toEqual(true);
            expect(response.data).toHaveProperty('_id');
        });

    });
    describe('Update', () => {
        it('should return success false if post id is missing', async() => {
            const mockId = "";
            const mockData = {
                articleHead: "",
                articleBody: "",
                author: ""
            };
            const Posts = jest.fn();
            postService({ Posts, constants });
            const response = await postService.update(mockId, mockData);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(400);
        });

        it('should return success false if params for update are missing', async() => {
            const mockId = "someObjectId";
            const mockData = {
                articleBody: "Some body",
                author: "John Rambo"
            };
            const Posts = jest.fn();
            postService({ Posts, constants });
            const response = await postService.update(mockId, mockData);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(400);
        });

        it('should return success false if function expect some error', async() => {
            const mockId = "someObjectId";
            const mockData = {
                articleHead: "Some head",
                articleBody: "Some body",
                author: "John Rambo"
            };
            const Posts = {
                findByIdAndUpdate: jest.fn().mockImplementation(() => {
                    throw new Error("Error in update operation");
                })
            };
            postService({ Posts, constants });
            const response = await postService.update(mockId, mockData);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(0);
        });

        it('should return success true if post is updated correctly', async() => {
            const mockId = "someObjectId";
            const mockData = {
                articleHead: "Some head",
                articleBody: "Some body",
                author: "John Rambo"
            };
            const Posts = {
                findByIdAndUpdate: jest.fn().mockResolvedValue({
                    _id: "someObjectId",
                    articleHead: "Some head",
                    articleBody: "Some body",
                    author: "John Rambo",
                    createdAt: "2021-06-30T06:51:55.871Z",
                    updatedAt: "2021-06-30T06:51:55.871Z",
                    __v: 0
                })
            };
            postService({ Posts, constants });
            const response = await postService.update(mockId, mockData);
            expect(response.success).toEqual(true);
            expect(response.data).toHaveProperty('_id');
        });
    });
    // describe('Get all', () => {
    //     it('should write your tests here...', () => {

    //     });
    // });
    // describe('Get by Id', () => {
    //     it('should write your tests here...', () => {

    //     });
    // });
});