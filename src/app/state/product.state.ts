export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}
export interface AppdataState<T> {
    dataState: DataStateEnum
    data?: T,
    errorMessage?: string
}