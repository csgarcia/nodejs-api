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

    describe('Get all', () => {

        it('should return success false if function expect some error', async() => {
            const Posts = {
                find: jest.fn().mockImplementation(() => {
                    throw new Error('Some internal error')
                })
            };
            postService({ Posts, constants });
            const response = await postService.getAll();
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(0);
        });

        it('should return success true and empty data query result is empty', async() => {
            const mockFindResponse = [];
            const Posts = {
                find: jest.fn().mockResolvedValue(mockFindResponse)
            }
            postService({ Posts, constants });
            const response = await postService.getAll();
            expect(response.success).toEqual(true);
            expect(response.data).toEqual([]);
        });

        it('should return success true and data if query result returns info', async() => {
            const mockFindResponse = [{
                    _id: "someObjectId",
                    articleHead: "Nodejs API",
                    articleBody: "Some text about nodejs api - updated",
                    author: "J. Rambo",
                    createdAt: "2021-06-30T06:51:55.871+0000",
                    updatedAt: "2021-07-04T05:03:53.436+0000"
                },
                {
                    _id: "someObjectId2",
                    articleHead: "PHP API",
                    articleBody: "Some text about php api",
                    author: "J. F Kennedy",
                    createdAt: "2021-07-05T01:01:00.018+0000",
                    updatedAt: "2021-07-05T01:01:00.018+0000"
                }
            ];
            const Posts = {
                find: jest.fn().mockResolvedValue(mockFindResponse)
            }
            postService({ Posts, constants });
            const response = await postService.getAll();
            expect(response.success).toEqual(true);
            expect(response.data).toEqual(expect.arrayContaining(mockFindResponse));
        });

        it('should return success true and data if query result returns info with filters', async() => {
            const mockFilter = [{
                field: 'author',
                value: "J. F Kennedy"
            }]
            const mockFindResponse = [{
                _id: "someObjectId2",
                articleHead: "PHP API",
                articleBody: "Some text about php api",
                author: "J. F Kennedy",
                createdAt: "2021-07-05T01:01:00.018+0000",
                updatedAt: "2021-07-05T01:01:00.018+0000"
            }];
            const Posts = {
                find: jest.fn().mockResolvedValue(mockFindResponse)
            };
            jest.spyOn(Posts, "find");
            postService({ Posts, constants });
            const response = await postService.getAll(mockFilter);
            expect(response.success).toEqual(true);
            expect(response.data).toEqual(expect.arrayContaining(mockFindResponse));
            // check data of the spy
            expect(Posts.find).toBeCalledTimes(1);
            expect(Posts.find).toBeCalledWith({
                author: "J. F Kennedy"
            });
        });
    });
    // describe('Get by Id', () => {
    //     it('should write your tests here...', () => {

    //     });
    // });
});