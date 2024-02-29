

/*
    * GET /
    * Homepage
*/

exports.homepage = async (req, res) => {

    const locals = {
            title: 'InteractiveApp-RH',
            description: 'Sistema de gerenciamento de funcionários'
        }
    res.render('index', locals );

}