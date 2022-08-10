package com.quarzumagencia.kya.Services.PreAnnotations;

public interface IValidationService<T> {

    void prePersist(final T entidadParaModificar) throws Exception;

    void preUpdate(final T entidadParaActualizar) throws Exception;

    void preRemove(final T entidadParaBorrar) throws Exception;

    void postPersist(final T entidadActualizada) throws Exception;

    void postUpdate(final T entidadActualizada) throws Exception;

    void postRemove(final T entidadBorrada) throws Exception;

}