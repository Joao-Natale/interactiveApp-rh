const app = express();
// convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

// use EJS as the view engine
app.set('view engine', 'ejs');

// Static file
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existingUser = await collection.findOne({name: data.name});
    if(existingUser) {
        res.send("User already exists. Please choose a different username.");
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        try {
            // Usando collection.create para inserir os dados no banco de dados
            await collection.create(data);
            // Envie uma resposta de sucesso após a inserção bem-sucedida
            res.send("User registered successfully.");
        } catch (error) {
            // Se houver algum erro durante a inserção, envie uma resposta com o erro
            res.status(500).send("Error registering user.");
            console.log(error);
        }
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username});
        if (!check) {
            res.send("Username cannot found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("home", { customers: customers });
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        console.log(error); // Adicione esta linha para imprimir o erro no console
        res.send("Wrong details");
    }
});