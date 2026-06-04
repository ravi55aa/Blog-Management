import {container} from "tsyringe";
import TYPES from "./types";

import Authservice from "../../Services/AuthService";
import AuthRepository from "../../Repository/AuthRepository";

container.registerSingleton(TYPES.AuthService,Authservice)
container.registerSingleton(TYPES.AuthRepository,AuthRepository);

