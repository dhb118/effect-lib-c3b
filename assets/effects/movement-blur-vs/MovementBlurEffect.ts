import { _decorator, Component, Node, ModelComponent ,Material,Vec3,Vec4, tween} from "cc";
const { ccclass, property,executeInEditMode } = _decorator;

@ccclass("MovementBlurEffect")
@executeInEditMode
export class MovementBlurEffect extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property
    public speed:number = 0.5;

    private _mats:Material[] = null;

    private _lastPos:Vec3 = new Vec3(0,0,0);

    private _t = 0;

    start () {
        // Your initialization goes here.
        const models = this.getComponentsInChildren(ModelComponent);
        this._mats = new Array(models!.length);
        for(let i=0;i<models.length;++i){
            this._mats[i] = models[i].sharedMaterial;
        }
        this._lastPos = new Vec3(0,0,0);//this.node.getPosition();
    }

    update (deltaTime: number) {
        // Your update function goes here.

        const newPos = this.node.getWorldPosition();

        if (this._lastPos.equals(newPos) || this._t > 1.0) 
            this._t = 0;

        this._t += deltaTime;

        let p : Vec3 = new Vec3();
        Vec3.lerp(p,this._lastPos,newPos,this._t*this.speed);
        this._lastPos.set(p);
        
        Vec3.subtract(p,this._lastPos,newPos);

        for(let i=0;i<this._mats.length;++i){
            this._mats[i].setProperty("moveDir",new Vec4(p.x,p.y,p.z,1));
        }

    }
}
