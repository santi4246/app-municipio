import axios, { AxiosError } from "axios";

export interface Model {
    Id: number
    CreatedAt: Date
    UpdatedAt: Date
    DeletedAt?: Date
    IsDeleted: Boolean
}

export interface Response<T> {
    "@odata.count"?: number
    value: T
}

export interface ActionResult<T> {
    data?: Response<T>
    error?: Error | AxiosError
}

export interface LoginResponse
{
    token:string
    validoHasta:string
    nombre:string
    apellido:string
    id:number
    rol:{
        id:number
        nombre:string
        permisos:string[]
    }
    nombreUsuario:string
    identificadoresEquipoJuzgado?: number[]
    juzgadoConfiguracionId: number
}

export interface Infraccion extends Model {
    Lugar: string
    FechaHora?: string
    EstadoPago: ("IMPAGA" | "PAGADA")
    Patente: string
    NroTramite: string
    Titular: TitularVehiculo    
    CodigoInfraccion?: CodigoInfraccion
    CodigoInfraccionId?: number    
    FechaVencimiento?: string
    Fecha2doVencimiento?: string
    FechaImpresionGenerada?: string    
    CuilTitular:string
    Correo?: { Estado: string, FechaEstado:Date, CodigoEstado:number }
}

export interface TitularVehiculo extends Model {    
    PatenteVehiculo: string
    MarcaVehiculo?: string
    ModeloVehiculo?: string
    TipoVehiculo: string
    FechaTransferenciaVehiculo: string
    NombreCompletoTitular: string
    CuilTitular: string
    DireccionCompletaTitular: string
    CodigoPostalTitular: string
    LocalidadTitular: string
    ProvinciaTitular: string
    DocumentoTitular: string
    TipoDocumentoTitular: ("DNI" | "LC" | "LE" | "CI" | "CUIT" | "PAS")
    TipoDocumentoTitularOriginal: string
    DepartamentoTitular: string
    CalleTitular: string
    NroTitular: string
    PisoTitular: string
    DeptoTitular: string
    TipoTitular: ("OTRO" | "EMPRESA" | "MASCULINO" | "FEMENINO")
    Nombre: string
    Apellido: string
    LocalidadTitularOriginal: string
    ProvinciaTitularOriginal: string
}

export interface CodigoInfraccion extends Model
{
    Abreviatura? : string
    Descripcion : string
    Codigo : string
    Identificador?: string
    Articulo? : string
    Inciso?  : string    
    SegmentosUf : {ValorUf?:number, LimiteMedicion?:number, LimiteFecha?:string, Provincia?: string, CodigoPostal?: string}[]       
    ValorUfMax : number
    ValorUfMin : number
    Categoria : string
    Observaciones? : string
    PuntosRestados? : number
    Etiqueta : string
}


const useInfraccionApi = () => {
    const module = "Infraccion";
    const api = `${process.env.REACT_APP_API}`;
    const apiDev = `${process.env.REACT_APP_DEV}`;

    return {
        getToken: async (): Promise<ActionResult<LoginResponse>> => {
            const data = {
                NombreUsuario: `${process.env.REACT_APP_USER}`,
                Contrasena: `${process.env.REACT_APP_PASS}`
            }            
            try {
                const response = await axios.post(`${apiDev}/Usuario/Login`, data);
                return { data: { value: response.data } }
            } catch (error: any | AxiosError) {
                return { error: error.message }
            }
        },
        list: async (cuitCuil: string, token: string): Promise<ActionResult<Infraccion[]>> => {            
            try {
                const response = await axios.get(`${apiDev}/${module}?$filter=contains(Titular/CuilTitular, '${cuitCuil}')&$expand=Titular`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`,
                        "X-ClientId": `${process.env.REACT_APP_CLIENT_ID_HEADER ?? ""}`
                    }
                });
                return { data: { value: response.data } }
            } catch (error: any | AxiosError) {
                return error.message
            }
        },
    }
};

export default useInfraccionApi;