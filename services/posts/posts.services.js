module.exports = (dependencies) => {

    /**
     * Service to create a new post
     * @param {*} data 
     * @param {String} data.articleHead - Post header
     * @param {String} data.articleBody - Post body for details
     * @param {String} data.author - Post author
     * @returns 
     */
    async function create(data) {
        try {
            // validate fields
            const { constants } = dependencies;
            if (!data || !data.articleHead || !data.articleBody || !data.author) {
                return {
                    success: false,
                    code: constants.POSTS.MISSING_PARAMS.code,
                    message: constants.POSTS.MISSING_PARAMS.message
                }
            }
            // create post
            const { Posts } = dependencies;
            const response = await Posts.create({
                articleHead: data.articleHead,
                articleBody: data.articleBody,
                author: data.author
            });
            // return response
            return {
                success: true,
                data: response
            };
        } catch (error) {
            return {
                success: false,
                code: 0,
                message: `Error in create post, ${error.message}`
            }
        }
    }

    /**
     * Service to update a post by id
     * @param {*} id - objectId from collection Posts
     * @param {*} data 
     * @param {String} data.articleHead - Post header
     * @param {String} data.articleBody - Post body for details
     * @param {String} data.author - Post author
     * @returns 
     */
    async function update(id, data) {
        try {
            // validate fields
            const { constants } = dependencies;
            if (!id) {
                return {
                    success: false,
                    code: constants.POSTS.MISSING_POST_ID.code,
                    message: constants.POSTS.MISSING_POST_ID.message
                }
            }

            if (!data || !data.articleHead || !data.articleBody || !data.author) {
                return {
                    success: false,
                    code: constants.POSTS.MISSING_PARAMS.code,
                    message: constants.POSTS.MISSING_PARAMS.message
                }
            }

            // update post
            const { Posts } = dependencies;
            const response = await Posts.findByIdAndUpdate(id, {
                articleHead: data.articleHead,
                articleBody: data.articleBody,
                author: data.author
            }, { new: true, runValidations: true });

            // return response
            return {
                success: true,
                data: response
            };

        } catch (error) {
            return {
                success: false,
                code: 0,
                message: `Error in update post, ${error.message}`
            }
        }
    }

    async function getAll(filters = []) {
        // TODO write code here after tests
    }

    async function getById(id) {
        // TODO write code here after tests
    }

    module.exports.create = create;
    module.exports.update = update;
    module.exports.getAll = getAll;
    module.exports.getById = getById;

};