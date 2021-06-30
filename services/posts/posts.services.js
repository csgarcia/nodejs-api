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
                message: `Error in create user, ${error.message}`
            }
        }
    }

    async function update(id, data) {

    }

    async function getAll(filters = []) {

    }

    async function getById(id) {

    }

    module.exports.create = create;
    module.exports.update = update;
    module.exports.getAll = getAll;
    module.exports.getById = getById;

};